export const metricsFieldsLeft = [
  // ----------------------
  { name: 'date', label: 'ΗΜ/ΝΙΑ', type: 'date' },
  { name: 'weight', label: 'ΒΑΡΟΣ kg', inputType: 'number' },
  { name: 'height', label: 'ΥΨΟΣ cm', inputType: 'number' },
  { name: 'bodyFat', label: 'ΠΟΣΟΣΤΟ ΛΙΠΟΥΣ %', inputType: 'number' },
  { name: 'vf', label: 'ΣΠΛΑΧΝΙΚΟ ΛΙΠΟΣ %', inputType: 'number' },

  { name: 'nonFatMass', label: 'ΑΛΙΠΗ ΜΥΙΚΗ ΜΑΖΑ gr', inputType: 'number' },
  { name: 'boneMass', label: 'ΩΣΤΙΚΗ ΜΑΖΑ gr', inputType: 'number' },
  { name: 'bmi', label: 'BMI', inputType: 'number' },
  { name: 'metabolicAge', label: 'ΜΕΤΑΒΟΛΙΚΗ ΗΛΙΚΙΑ', inputType: 'number' },
  { name: 'bodyWater', label: 'ΠΟΣΟΣΤΟ ΝΕΡΟΥ %', inputType: 'number' }
];
export const metricsFieldsRight = [
  { name: 'chest', label: 'ΘΩΡΑΚΑΣ cm' },
  { name: 'pelvis', label: 'ΜΕΣΗ cm' },
  { name: 'belly', label: 'ΚΟΙΛΙΑ cm' },
  { name: 'lekani', label: 'ΛΕΚΑΝΗ cm' },
  { name: 'thigh', label: 'ΜΗΡΟΣ cm' },
  { name: 'calves', label: 'ΓΑΜΠΑ cm' },
  { name: 'biseps', label: 'ΔΙΚΕΦΑΛΟΣ cm' }
];

export const profileFields = [
  { name: 'firstName', label: 'ΟΝΟΜΑ', required: true },
  { name: 'lastName', label: 'ΕΠΩΝΥΜΟ', required: true },
  { name: 'gender', label: 'ΦΥΛΟ', type: 'select', values: [''] },
  // { name: 'phone', label: 'ΤΗΛΕΦΩΝΟ', inputType: 'number' },
  { name: 'mobile', label: 'ΚΙΝΗΤΟ', required: true, inputType: 'number' },
  { name: 'email', label: 'EMAIL', inputType: 'email' },
  { name: 'age', label: 'ΗΛΙΚΙΑ', inputType: 'number' },
  { name: 'nextApoitment', label: 'ΕΠΟΜΕΝΟ ΡΑΝΤΕΒΟΥ', type: 'date' }
];

export const notesFilelds = [
  { name: 'activity', label: 'ΠΡΟΠΟΝΗΣΗ (ΕΙΔΟΣ,ΣΥΧΝΟΤΗΤΑ,ΩΡΕΣ Κ.Λ.Π)' },
  { name: 'allergies', label: 'ΔΙΑΦΟΡΕΣ ΠΑΘΗΣΕΙΣ - ΑΛΕΡΓΙΕΣ Κ.Α' },
  { name: 'notes', label: 'ΣΗΜΕΙΩΣΕΣ - ΠΑΡΑΤΗΡΗΣΕΙΣ', type: 'textArea' },
  { name: 'suplements', label: 'ΣΥΜΠΛΗΡΩΜΑΤΑ - ΔΙΑΤΡΟΦΗΣ', type: 'textArea' }
];
