import { useEffect, useMemo, useState } from 'react';
import PostcardPreview from '../components/PostcardPreview';
import SectionTitle from '../components/SectionTitle';
import { useAppState } from '../context/AppStateContext';
import { getFavoriteSpotPostcardLine } from '../data/spots';
import { localizePostcardTheme, postcardThemes } from '../data/postcardThemes';

const DEFAULT_IMAGE_EDIT = {
  zoom: 118,
  x: 0,
  y: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCoverImage(ctx, image, x, y, width, height, edit) {
  const scale = Math.max(width / image.width, height / image.height) * (edit.zoom / 100);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const maxOffsetX = Math.max(0, drawWidth - width) / 2;
  const maxOffsetY = Math.max(0, drawHeight - height) / 2;
  const drawX = x + (width - drawWidth) / 2 - (edit.x / 100) * maxOffsetX;
  const drawY = y + (height - drawHeight) / 2 - (edit.y / 100) * maxOffsetY;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.filter = `brightness(${edit.brightness}%) contrast(${edit.contrast}%) saturate(${edit.saturation}%)`;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  ctx.filter = 'none';
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = /\s/.test(text) ? text.split(/\s+/) : Array.from(text);
  let line = '';
  let lines = 0;

  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      if (lines < maxLines) {
        ctx.fillText(line, x, y + lines * lineHeight);
      }
      lines += 1;
      line = word;
    } else {
      line = testLine;
    }

    if (index === words.length - 1 && lines < maxLines) {
      ctx.fillText(line, x, y + lines * lineHeight);
    }
  });
}

async function renderPostcardBlob({
  theme,
  favoriteSpot,
  spots,
  uploadedImage,
  imageEdit,
  customMessage,
  language,
}) {
  const isChinese = language === 'zh';
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');
  const [paper, accent, deep] = theme.palette;

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const artHeight = 440;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, artHeight);
  gradient.addColorStop(0, paper);
  gradient.addColorStop(0.58, accent);
  gradient.addColorStop(1, deep);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, artHeight);

  if (uploadedImage) {
    const image = await loadImage(uploadedImage);
    drawCoverImage(ctx, image, 0, 0, canvas.width, artHeight, imageEdit);
    const overlay = ctx.createLinearGradient(0, 0, 0, artHeight);
    overlay.addColorStop(0, 'rgba(20,25,28,0.08)');
    overlay.addColorStop(1, 'rgba(20,25,28,0.52)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, canvas.width, artHeight);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  ctx.beginPath();
  ctx.roundRect(64, 58, 220, 44, 22);
  ctx.fill();
  ctx.fillStyle = '#24323a';
  ctx.font = '700 22px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText('Chang Gate / 阊门', 86, 87);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 58px Georgia, serif';
  ctx.fillText(theme.name, 64, 326);
  ctx.font = '500 28px "Plus Jakarta Sans", Arial, sans-serif';
  wrapText(ctx, theme.caption, 66, 368, 760, 36, 2);

  ctx.fillStyle = '#fffdf8';
  ctx.fillRect(0, artHeight, canvas.width, canvas.height - artHeight);
  ctx.fillStyle = '#d97b35';
  ctx.font = '800 20px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(isChinese ? '路线记忆' : 'ROUTE MEMORY', 64, 504);
  ctx.fillStyle = '#24323a';
  ctx.font = '700 36px Georgia, serif';
  wrapText(ctx, getFavoriteSpotPostcardLine(favoriteSpot, language), 64, 552, 920, 44, 2);
  ctx.fillStyle = '#5f6b71';
  ctx.font = '500 24px "Plus Jakarta Sans", Arial, sans-serif';
  wrapText(
    ctx,
    isChinese
      ? `由 ${spots.length} 个地点和“${theme.mood}”氛围生成。`
      : `Built from ${spots.length} stops and a ${theme.mood.toLowerCase()} mood selection.`,
    64,
    636,
    960,
    34,
    2,
  );
  ctx.fillStyle = '#24323a';
  ctx.font = 'italic 25px Georgia, serif';
  wrapText(
    ctx,
    `"${customMessage || (isChinese ? '从阊门出发，带着水岸、穿行和小发现。' : 'From Chang Gate, with water, crossings, and small discoveries.')}"`,
    64,
    712,
    960,
    34,
    1,
  );

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
}

export default function PostcardPage() {
  const { isChinese, language, spots, selectedRoute } = useAppState();
  const [selectedThemeId, setSelectedThemeId] = useState(postcardThemes[0].id);
  const [favoriteSpotId, setFavoriteSpotId] = useState(spots[0]?.id ?? '');
  const [status, setStatus] = useState('idle');
  const [helperMessage, setHelperMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [imageEdit, setImageEdit] = useState(DEFAULT_IMAGE_EDIT);
  const defaultMessage = isChinese
    ? '从阊门出发，带着水岸、穿行和小发现。'
    : 'From Chang Gate, with water, crossings, and small discoveries.';
  const [customMessage, setCustomMessage] = useState(defaultMessage);

  const selectedTheme =
    localizePostcardTheme(
      postcardThemes.find((theme) => theme.id === selectedThemeId) ?? postcardThemes[0],
      language,
    );
  const favoriteSpot =
    spots.find((spot) => spot.id === favoriteSpotId) ?? spots[0];

  useEffect(() => {
    if (!favoriteSpotId && spots[0]) {
      setFavoriteSpotId(spots[0].id);
    }
  }, [spots, favoriteSpotId]);

  useEffect(() => {
    setCustomMessage((current) => {
      const defaults = [
        'From Chang Gate, with water, crossings, and small discoveries.',
        '从阊门出发，带着水岸、穿行和小发现。',
      ];

      return defaults.includes(current) ? defaultMessage : current;
    });
  }, [defaultMessage]);

  useEffect(() => {
    if (status !== 'loading') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus('ready');
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const routeSummary = useMemo(
    () => `${selectedRoute.name} · ${selectedRoute.duration} · ${selectedRoute.distance}`,
    [selectedRoute],
  );

  const postcardPayload = {
    theme: selectedTheme,
    favoriteSpot,
    spots,
    uploadedImage,
    imageEdit,
    customMessage,
    language,
  };

  const updateEdit = (key, value) => {
    setImageEdit((current) => ({ ...current, [key]: Number(value) }));
    if (status === 'ready') {
      setHelperMessage(isChinese ? '预览已更新。再次下载即可导出最新版本。' : 'Preview updated. Download or share again to export the latest version.');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setHelperMessage(isChinese ? '请上传图片文件。' : 'Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(String(reader.result));
      setUploadedImageName(file.name);
      setStatus('ready');
      setHelperMessage(isChinese ? '照片已加载。调整后即可导出明信片。' : 'Photo loaded. Adjust it and export the postcard.');
    };
    reader.readAsDataURL(file);
  };

  const createPostcardBlob = async () => {
    if (!favoriteSpot) {
      throw new Error(isChinese ? '导出前请选择一个最喜欢的地点。' : 'Pick a favorite spot before exporting.');
    }

    const blob = await renderPostcardBlob(postcardPayload);
    if (!blob) {
      throw new Error(isChinese ? '无法生成明信片图片。' : 'Could not render postcard image.');
    }

    return blob;
  };

  const downloadPostcard = async () => {
    try {
      const blob = await createPostcardBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'chang-gate-postcard.png';
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setHelperMessage(isChinese ? '已下载 chang-gate-postcard.png。' : 'Downloaded chang-gate-postcard.png.');
    } catch (err) {
      setHelperMessage(err.message);
    }
  };

  return (
    <div className="page-stack">
      {status === 'ready' && favoriteSpot ? (
        <section className="page-stack">
          <PostcardPreview
            theme={selectedTheme}
            favoriteSpot={favoriteSpot}
            uploadedImage={uploadedImage}
            imageEdit={imageEdit}
            customMessage={customMessage}
          />

          <div className="card postcard-actions">
            <button type="button" className="button button-primary" onClick={downloadPostcard}>
              {isChinese ? '下载明信片 PNG' : 'Download postcard PNG'}
            </button>
            {helperMessage ? <p className="generator-note">{helperMessage}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="card postcard-controls">
        <SectionTitle
          eyebrow={isChinese ? '明信片工作室' : 'Postcard studio'}
          title={isChinese ? '上传、编辑并导出自定义纪念卡' : 'Upload, edit, and export a custom keepsake'}
          description={isChinese ? '选择照片，调整裁切和氛围，然后下载明信片。' : 'Choose a photo, adjust the crop and mood, then download the postcard.'}
        />

        <div className="selection-block">
          <p className="selection-label">{isChinese ? '已选路线' : 'Selected route'}</p>
          <div className="selection-card">
            <strong>{selectedRoute.name}</strong>
            <span>{routeSummary}</span>
          </div>
        </div>

        <div className="selection-block">
          <p className="selection-label">{isChinese ? '上传明信片照片' : 'Upload postcard photo'}</p>
          {uploadedImage ? (
            <div className="upload-card upload-card--active">
              <span>{uploadedImageName}</span>
              <button
                type="button"
                className="button button-secondary button-small"
                onClick={() => {
                  setUploadedImage('');
                  setUploadedImageName('');
                  setImageEdit(DEFAULT_IMAGE_EDIT);
                  setHelperMessage('');
                }}
              >
                {isChinese ? '移除图片' : 'Remove image'}
              </button>
            </div>
          ) : (
            <label className="upload-card">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <span>{isChinese ? '从设备选择图片' : 'Choose image from device'}</span>
            </label>
          )}
        </div>

        {uploadedImage ? (
          <div className="selection-block">
            <p className="selection-label">{isChinese ? '编辑照片' : 'Edit photo'}</p>
            <div className="edit-grid">
              <label>
                <span>{isChinese ? '缩放' : 'Zoom'}</span>
                <input type="range" min="100" max="220" value={imageEdit.zoom} onChange={(e) => updateEdit('zoom', e.target.value)} />
              </label>
              <label>
                <span>{isChinese ? '水平位置' : 'Horizontal'}</span>
                <input type="range" min="-100" max="100" value={imageEdit.x} onChange={(e) => updateEdit('x', e.target.value)} />
              </label>
              <label>
                <span>{isChinese ? '垂直位置' : 'Vertical'}</span>
                <input type="range" min="-100" max="100" value={imageEdit.y} onChange={(e) => updateEdit('y', e.target.value)} />
              </label>
              <label>
                <span>{isChinese ? '亮度' : 'Brightness'}</span>
                <input type="range" min="70" max="135" value={imageEdit.brightness} onChange={(e) => updateEdit('brightness', e.target.value)} />
              </label>
              <label>
                <span>{isChinese ? '对比度' : 'Contrast'}</span>
                <input type="range" min="75" max="145" value={imageEdit.contrast} onChange={(e) => updateEdit('contrast', e.target.value)} />
              </label>
              <label>
                <span>{isChinese ? '饱和度' : 'Saturation'}</span>
                <input type="range" min="60" max="155" value={imageEdit.saturation} onChange={(e) => updateEdit('saturation', e.target.value)} />
              </label>
            </div>
            <button
              type="button"
              className="button button-secondary button-small"
              onClick={() => setImageEdit(DEFAULT_IMAGE_EDIT)}
            >
              {isChinese ? '重置编辑' : 'Reset edits'}
            </button>
          </div>
        ) : null}

        {!uploadedImage ? (
          <div className="selection-block">
            <p className="selection-label">{isChinese ? '选择氛围主题' : 'Choose a mood theme'}</p>
            <div className="theme-grid">
              {postcardThemes.map((theme) => {
                const displayTheme = localizePostcardTheme(theme, language);
                return (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-card${selectedThemeId === theme.id ? ' is-selected' : ''}`}
                  onClick={() => setSelectedThemeId(theme.id)}
                  aria-pressed={selectedThemeId === theme.id}
                >
                  <div
                    className="theme-swatches"
                    aria-hidden="true"
                    style={{
                      background: `linear-gradient(135deg, ${theme.palette[0]}, ${theme.palette[1]}, ${theme.palette[2]})`,
                    }}
                  />
                  <strong>{displayTheme.name}</strong>
                  <span>{displayTheme.mood}</span>
                </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="selection-block">
          <p className="selection-label">{isChinese ? '选择最喜欢的地点' : 'Pick a favorite spot'}</p>
          <div className="favorite-grid">
            {spots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                className={`favorite-chip${favoriteSpotId === spot.id ? ' is-selected' : ''}`}
                onClick={() => setFavoriteSpotId(spot.id)}
                aria-pressed={favoriteSpotId === spot.id}
              >
                {spot.shortName}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-block">
          <p className="selection-label">{isChinese ? '明信片留言' : 'Postcard message'}</p>
          <textarea
            className="postcard-message-input"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={3}
            maxLength={140}
          />
        </div>

        <div className="generator-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setHelperMessage('');
              setStatus('loading');
            }}
            disabled={!favoriteSpot}
          >
            {status === 'loading' ? (isChinese ? '正在制作明信片...' : 'Making postcard...') : (isChinese ? '制作明信片' : 'Make postcard')}
          </button>
          <p className="generator-note" aria-live="polite">
            {status === 'loading'
              ? isChinese ? '正在组合照片、路线记忆和明信片版式。' : 'Composing your photo, route memory, and postcard layout.'
              : isChinese ? '上传照片或使用主题背景，然后导出最终卡片。' : 'Upload a photo or use the theme background, then export the final card.'}
          </p>
        </div>
      </section>
    </div>
  );
}
