/**
 * Tour Editor Logic
 */

// DOM Elements
const viewer = document.getElementById('editor-viewer');
const placeholder = document.getElementById('viewer-placeholder');
const urlInput = document.getElementById('model-url-input');
const btnLoadUrl = document.getElementById('btn-load-url');
const dropZone = document.getElementById('drop-zone');
const btnCapture = document.getElementById('btn-capture');
const stepsList = document.getElementById('steps-list');
const stepEditor = document.getElementById('step-editor');
const btnPreviewTour = document.getElementById('btn-preview-tour');
const btnCopyJson = document.getElementById('btn-copy-json');
const btnImportJson = document.getElementById('btn-import-json');

// Editor Form Elements
const editOrbit = document.getElementById('edit-orbit');
const editTarget = document.getElementById('edit-target');
const editFov = document.getElementById('edit-fov');
const editTextDe = document.getElementById('edit-text-de');
const editTextEn = document.getElementById('edit-text-en');
const editAudioDe = document.getElementById('edit-audio-de');
const editAudioEn = document.getElementById('edit-audio-en');
const editDuration = document.getElementById('edit-duration');
const btnSaveStep = document.getElementById('btn-save-step');
const editIndexLabel = document.getElementById('edit-step-index');

// Preview Elements
const previewOverlay = document.getElementById('preview-overlay');
const previewText = document.getElementById('preview-text');
const previewProgressBar = document.getElementById('preview-progress-bar');
const btnStopPreview = document.getElementById('btn-stop-preview');

// Import Modal
const importModal = document.getElementById('import-modal');
const importJsonText = document.getElementById('import-json-text');
const btnCancelImport = document.getElementById('btn-cancel-import');
const btnConfirmImport = document.getElementById('btn-confirm-import');

// Toast
const toast = document.getElementById('toast');

// State
let steps = [];
let activeStepIndex = -1;
let draggedIndex = -1;
let previewState = {
  playing: false,
  currentIndex: 0,
  timerId: null,
  audio: null
};

// ==========================================
// Loading Models
// ==========================================

function loadModel(url) {
  viewer.src = url;
  placeholder.classList.add('hidden');
  btnCapture.disabled = false;
  showToast('Model loaded');
}

btnLoadUrl.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (url) loadModel(url);
});

// Drag and drop for GLB
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    if (file.name.toLowerCase().endsWith('.glb')) {
      const objectUrl = URL.createObjectURL(file);
      loadModel(objectUrl);
    } else {
      showToast('Please drop a .glb file');
    }
  }
});

// ==========================================
// Capturing Viewpoints
// ==========================================

btnCapture.addEventListener('click', () => {
  // Get Orbit
  const orbit = viewer.getCameraOrbit(); // {theta, phi, radius} in radians/meters
  const thetaDeg = (orbit.theta * 180 / Math.PI).toFixed(1);
  const phiDeg = (orbit.phi * 180 / Math.PI).toFixed(1);
  const radiusM = orbit.radius.toFixed(3);
  const orbitStr = `${thetaDeg}deg ${phiDeg}deg ${radiusM}m`;

  // Get Target
  const target = viewer.getCameraTarget(); // {x, y, z} in meters
  let targetStr = '';
  // Only store target if it's not the default 0 0 0
  if (Math.abs(target.x) > 0.001 || Math.abs(target.y) > 0.001 || Math.abs(target.z) > 0.001) {
    targetStr = `${target.x.toFixed(3)}m ${target.y.toFixed(3)}m ${target.z.toFixed(3)}m`;
  }

  // Get FOV
  const fov = viewer.getFieldOfView(); // radians
  const fovStr = `${(fov * 180 / Math.PI).toFixed(1)}deg`;

  const newStep = {
    cameraOrbit: orbitStr,
    cameraTarget: targetStr || "auto auto auto",
    fieldOfView: fovStr,
    text: { de: '', en: '' },
    audio: { de: '', en: '' },
    durationMs: 5000
  };

  steps.push(newStep);
  renderSteps();
  selectStep(steps.length - 1);
  showToast('Viewpoint captured');
});

// ==========================================
// Step Management & UI
// ==========================================

function renderSteps() {
  btnPreviewTour.disabled = steps.length === 0;

  if (steps.length === 0) {
    stepsList.innerHTML = '<div class="empty-state">No steps captured yet.<br>Load a model and capture a viewpoint.</div>';
    stepEditor.classList.add('hidden');
    return;
  }

  stepsList.innerHTML = '';
  
  steps.forEach((step, index) => {
    const card = document.createElement('div');
    card.className = `step-card ${index === activeStepIndex ? 'active' : ''}`;
    card.draggable = true;
    card.dataset.index = index;

    const shortText = step.text.en || step.text.de || '(No text)';

    card.innerHTML = `
      <div class="step-card-header">
        <span class="step-number">Step ${index + 1}</span>
        <div class="step-actions">
          <button class="btn btn-sm btn-outline btn-goto" data-index="${index}">Go To</button>
          <button class="btn btn-sm btn-red btn-delete" data-index="${index}">✕</button>
        </div>
      </div>
      <div class="step-summary">
        <div class="step-summary-orbit">${step.cameraOrbit}</div>
        <div class="step-summary-text">"${shortText}"</div>
      </div>
    `;

    // Click to select
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn-goto') && !e.target.classList.contains('btn-delete')) {
        selectStep(index);
      }
    });

    // Drag events for reordering
    card.addEventListener('dragstart', (e) => {
      draggedIndex = index;
      e.dataTransfer.effectAllowed = 'move';
      // Slight delay so the drag image looks right before fading the card
      setTimeout(() => card.style.opacity = '0.5', 0);
    });

    card.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (index !== draggedIndex) card.classList.add('drag-over');
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault(); // Necessary to allow drop
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      if (draggedIndex > -1 && draggedIndex !== index) {
        // Reorder array
        const item = steps.splice(draggedIndex, 1)[0];
        steps.splice(index, 0, item);
        
        // Update active index if it moved
        if (activeStepIndex === draggedIndex) {
          activeStepIndex = index;
        } else if (draggedIndex < activeStepIndex && index >= activeStepIndex) {
          activeStepIndex--;
        } else if (draggedIndex > activeStepIndex && index <= activeStepIndex) {
          activeStepIndex++;
        }
        
        renderSteps();
      }
    });

    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
      document.querySelectorAll('.step-card').forEach(c => c.classList.remove('drag-over'));
      draggedIndex = -1;
    });

    stepsList.appendChild(card);
  });

  // Attach button events
  document.querySelectorAll('.btn-goto').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      gotoStep(idx);
    });
  });

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      if (confirm(`Delete Step ${idx + 1}?`)) {
        steps.splice(idx, 1);
        if (activeStepIndex === idx) activeStepIndex = -1;
        else if (activeStepIndex > idx) activeStepIndex--;
        renderSteps();
        if (activeStepIndex > -1) selectStep(activeStepIndex);
        else stepEditor.classList.add('hidden');
      }
    });
  });
}

function selectStep(index) {
  activeStepIndex = index;
  renderSteps(); // Update active class
  
  const step = steps[index];
  editIndexLabel.textContent = index + 1;
  editOrbit.value = step.cameraOrbit || '';
  editTarget.value = step.cameraTarget !== "auto auto auto" ? (step.cameraTarget || '') : '';
  editFov.value = step.fieldOfView || '';
  editTextDe.value = step.text.de || '';
  editTextEn.value = step.text.en || '';
  editAudioDe.value = step.audio?.de || '';
  editAudioEn.value = step.audio?.en || '';
  editDuration.value = step.durationMs || 5000;
  
  stepEditor.classList.remove('hidden');
}

function gotoStep(index) {
  const step = steps[index];
  viewer.cameraOrbit = step.cameraOrbit;
  if (step.cameraTarget && step.cameraTarget !== "auto auto auto") {
    viewer.cameraTarget = step.cameraTarget;
  }
  if (step.fieldOfView) {
    viewer.fieldOfView = step.fieldOfView;
  }
}

btnSaveStep.addEventListener('click', () => {
  if (activeStepIndex === -1) return;
  
  const step = steps[activeStepIndex];
  step.cameraOrbit = editOrbit.value; // Readonly, but kept for completeness
  step.cameraTarget = editTarget.value.trim() || "auto auto auto";
  step.fieldOfView = editFov.value.trim();
  step.text.de = editTextDe.value.trim();
  step.text.en = editTextEn.value.trim();
  
  const audioDe = editAudioDe.value.trim();
  const audioEn = editAudioEn.value.trim();
  if (audioDe || audioEn) {
    step.audio = { de: audioDe, en: audioEn };
  } else {
    delete step.audio;
  }
  
  step.durationMs = parseInt(editDuration.value, 10) || 5000;
  
  renderSteps();
  showToast('Step updated');
});

// ==========================================
// Tour Preview
// ==========================================

btnPreviewTour.addEventListener('click', () => {
  if (steps.length === 0) return;
  previewState.playing = true;
  previewState.currentIndex = 0;
  
  viewer.autoRotate = false;
  viewer.cameraControls = false;
  previewOverlay.classList.remove('hidden');
  
  playPreviewStep(0);
});

btnStopPreview.addEventListener('click', stopPreview);

function stopPreview() {
  previewState.playing = false;
  if (previewState.timerId) clearTimeout(previewState.timerId);
  if (previewState.audio) {
    previewState.audio.pause();
    previewState.audio = null;
  }
  
  previewOverlay.classList.add('hidden');
  viewer.autoRotate = true;
  viewer.cameraControls = true;
  previewProgressBar.style.width = '0%';
  previewProgressBar.style.transition = 'none';
}

function playPreviewStep(index) {
  if (!previewState.playing) return;
  if (index >= steps.length) {
    stopPreview();
    showToast('Preview finished');
    return;
  }

  previewState.currentIndex = index;
  const step = steps[index];
  
  // Set camera
  viewer.cameraOrbit = step.cameraOrbit;
  if (step.cameraTarget && step.cameraTarget !== "auto auto auto") viewer.cameraTarget = step.cameraTarget;
  if (step.fieldOfView) viewer.fieldOfView = step.fieldOfView;

  // Set text
  previewText.textContent = `[Step ${index + 1}] ` + (step.text.en || step.text.de || '');
  
  // Reset progress bar
  previewProgressBar.style.transition = 'none';
  previewProgressBar.style.width = '0%';
  
  // Wait 1s for camera move to start, then start audio/timer
  setTimeout(() => {
    if (!previewState.playing) return;
    
    // Animate progress bar
    void previewProgressBar.offsetWidth; // Force reflow
    previewProgressBar.style.transition = `width ${step.durationMs}ms linear`;
    previewProgressBar.style.width = '100%';

    // Mock audio duration using timer since we can't always load external audio due to CORS in preview
    previewState.timerId = setTimeout(() => {
      playPreviewStep(index + 1);
    }, step.durationMs);
    
  }, 1000);
}

// ==========================================
// Export / Import
// ==========================================

function getCleanJson() {
  const cleanSteps = steps.map(step => {
    const s = { ...step };
    if (!s.cameraTarget || s.cameraTarget === "auto auto auto") delete s.cameraTarget;
    if (!s.fieldOfView) delete s.fieldOfView;
    if (!s.audio || (!s.audio.de && !s.audio.en)) delete s.audio;
    if (s.durationMs === 5000) delete s.durationMs; // omit default
    return s;
  });
  return JSON.stringify(cleanSteps, null, 2);
}

btnCopyJson.addEventListener('click', () => {
  if (steps.length === 0) {
    showToast('No steps to export');
    return;
  }
  
  const jsonStr = getCleanJson();
  navigator.clipboard.writeText(jsonStr).then(() => {
    showToast('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy', err);
    showToast('Failed to copy to clipboard');
  });
});

btnImportJson.addEventListener('click', () => {
  importJsonText.value = getCleanJson();
  importModal.showModal();
});

btnCancelImport.addEventListener('click', () => {
  importModal.close();
});

btnConfirmImport.addEventListener('click', () => {
  try {
    const parsed = JSON.parse(importJsonText.value);
    if (Array.isArray(parsed)) {
      // Normalize imported data
      steps = parsed.map(s => ({
        cameraOrbit: s.cameraOrbit,
        cameraTarget: s.cameraTarget || "auto auto auto",
        fieldOfView: s.fieldOfView || "",
        text: s.text || { de: '', en: '' },
        audio: s.audio || { de: '', en: '' },
        durationMs: s.durationMs || 5000
      }));
      renderSteps();
      importModal.close();
      showToast('Imported successfully');
      stepEditor.classList.add('hidden');
    } else {
      showToast('Error: JSON must be an array');
    }
  } catch (e) {
    showToast('Error parsing JSON');
  }
});

// ==========================================
// Utils
// ==========================================

let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
