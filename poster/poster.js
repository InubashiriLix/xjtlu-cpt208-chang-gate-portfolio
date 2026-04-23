import posterPdf from './CPT208_GroupA1-1_Chang_Gate_Canal_Quest.pdf?url';

const posterFrame = document.getElementById('poster-frame');
const posterPreviewUrl = `${posterPdf}#toolbar=1&navpanes=0&view=FitH`;

posterFrame.src = posterPreviewUrl;
