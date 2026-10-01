/**
 * Utility functions
 */

// Remove accents and lowercase for search
function normalizeText(str) {
  if (!str) return '';
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function toast(msg, duration = 3000) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.add('hidden'), duration);
}

function confirmDialog(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById('confirm-dialog');
    const msgEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-ok');
    const cancelBtn = document.getElementById('confirm-cancel');
    msgEl.textContent = message;
    modal.classList.remove('hidden');

    function cleanup(result) {
      modal.classList.add('hidden');
      okBtn.onclick = null;
      cancelBtn.onclick = null;
      resolve(result);
    }
    okBtn.onclick = () => cleanup(true);
    cancelBtn.onclick = () => cleanup(false);
  });
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(meters) {
  if (meters < 1000) return Math.round(meters) + ' m';
  return (meters / 1000).toFixed(1) + ' km';
}

function statusBadgeClass(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('ativo')) return 'ativo';
  if (s.includes('cortado')) return 'cortado';
  if (s.includes('desligado')) return 'desligado';
  if (s.includes('manutenção') || s.includes('manutencao')) return 'manutencao';
  return 'outro';
}

function statusMarkerClass(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('ativo')) return 'marker-ativo';
  if (s.includes('cortado')) return 'marker-cortado';
  if (s.includes('desligado')) return 'marker-desligado';
  if (s.includes('manutenção') || s.includes('manutencao')) return 'marker-manutencao';
  if (s.includes('retirado')) return 'marker-retirado';
  return 'marker-outro';
}

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadText(text, filename, mime = 'text/csv') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function metersToGeoJSON(meters) {
  return {
    type: 'FeatureCollection',
    features: meters.map(m => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [m.longitude, m.latitude]
      },
      properties: {
        id: m.id,
        meter_number: m.meter_number,
        customer_name: m.customer_name,
        house_number: m.house_number,
        street_id: m.street_id,
        reference: m.reference,
        notes: m.notes,
        status: m.status,
        gps_accuracy: m.gps_accuracy,
        created_at: m.created_at
      }
    }))
  };
}

function streetsToGeoJSON(streets) {
  return {
    type: 'FeatureCollection',
    features: streets.map(s => ({
      type: 'Feature',
      geometry: s.geometry || {
        type: 'LineString',
        coordinates: [
          [s.start_longitude, s.start_latitude],
          [s.end_longitude, s.end_latitude]
        ]
      },
      properties: {
        id: s.id,
        type: s.type,
        name: s.name,
        full_name: `${s.type} ${s.name}`
      }
    }))
  };
}

function generateCSV(meters, streetsMap) {
  const headers = ['id', 'meter_number', 'customer_name', 'house_number', 'street', 'reference', 'notes', 'status', 'latitude', 'longitude', 'gps_accuracy', 'created_at'];
  const rows = meters.map(m => {
    const street = m.street_id ? streetsMap[m.street_id] : null;
    const streetName = street ? `${street.type} ${street.name}` : '';
    return [
      m.id,
      m.meter_number || '',
      m.customer_name || '',
      m.house_number || '',
      streetName,
      m.reference || '',
      (m.notes || '').replace(/"/g, '""'),
      m.status || '',
      m.latitude,
      m.longitude,
      m.gps_accuracy || '',
      m.created_at || ''
    ].map(v => `"${v}"`).join(',');
  });
  return headers.join(',') + '\n' + rows.join('\n');
}

window.Utils = {
  normalizeText,
  toast,
  confirmDialog,
  haversine,
  formatDistance,
  statusBadgeClass,
  statusMarkerClass,
  downloadJSON,
  downloadText,
  metersToGeoJSON,
  streetsToGeoJSON,
  generateCSV
};
