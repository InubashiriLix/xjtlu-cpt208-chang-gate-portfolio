import { getFavoriteSpotPostcardLine } from '../data/spots';
import { useAppState } from '../context/AppStateContext';

export default function PostcardPreview({
  theme,
  favoriteSpot,
  uploadedImage,
  imageEdit,
  customMessage,
}) {
  const { isChinese, language } = useAppState();
  const imageStyle = uploadedImage
    ? {
        transform: `translate(${imageEdit.x / 4}%, ${imageEdit.y / 4}%) scale(${imageEdit.zoom / 100})`,
        filter: `brightness(${imageEdit.brightness}%) contrast(${imageEdit.contrast}%) saturate(${imageEdit.saturation}%)`,
      }
    : null;

  return (
    <article className="card postcard-preview">
      <div
        className={`postcard-art${uploadedImage ? ' has-user-image' : ''}`}
        style={{
          background: `linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[1]})`,
        }}
      >
        {uploadedImage ? (
          <img className="postcard-user-image" src={uploadedImage} alt="" style={imageStyle} />
        ) : null}
        <div className="postcard-art-badge">Chang Gate / 阊门</div>
        <div className="postcard-art-copy">
          <p className="eyebrow">
            {uploadedImage
              ? isChinese ? '自定义照片明信片' : 'Custom photo postcard'
              : isChinese ? '生成式纪念概念' : 'Generated souvenir concept'}
          </p>
          <h3>{theme.name}</h3>
          <p>{theme.caption}</p>
        </div>
      </div>
      <div className="postcard-body">
        <p className="eyebrow">{isChinese ? '路线记忆' : 'Route memory'}</p>
        <h3>{getFavoriteSpotPostcardLine(favoriteSpot, language)}</h3>
        <p>
          {isChinese
            ? `${theme.mood}的氛围选择，把这段步行变成了一张独特的纪念卡片。`
            : `A ${theme.mood.toLowerCase()} mood selection turned this walk into a unique keepsake with a warm editorial look.`}
        </p>
        <p className="postcard-signoff">
          &ldquo;{customMessage || (isChinese ? '从阊门出发，带着水岸、穿行和小发现。' : 'From Chang Gate, with water, crossings, and small discoveries.')}&rdquo;
        </p>
      </div>
    </article>
  );
}
