-- Medical Center schema

DROP DATABASE IF EXISTS medical_center;
CREATE DATABASE medical_center;
\c medical_center

-- Doctors, Patients, Visits, Diseases

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialty TEXT,
  UNIQUE (first_name, last_name)
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  UNIQUE (first_name, last_name, date_of_birth)
);

-- A visit is when a patient sees a doctor (many-to-many via visits)
CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  visit_date TIMESTAMP NOT NULL,
  notes TEXT
);

-- Diseases table; a visit may diagnose one or more diseases
CREATE TABLE diseases (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icd_code TEXT
);

-- join table: diagnoses (many diseases per visit)
CREATE TABLE diagnoses (
  visit_id INTEGER NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  PRIMARY KEY (visit_id, disease_id)
);

-- seed some example data
INSERT INTO doctors (first_name, last_name, specialty) VALUES
  ('Alice', 'Wong', 'Cardiology'),
  ('Brian', 'Smith', 'General Practice'),
  ('Carmen', 'Lopez', 'Endocrinology')
ON CONFLICT DO NOTHING;

INSERT INTO patients (first_name, last_name, date_of_birth, gender) VALUES
  ('John', 'Doe', '1980-06-15', 'M'),
  ('Jane', 'Roe', '1990-11-20', 'F'),
  ('Sam', 'Green', '2005-03-02', 'M')
ON CONFLICT DO NOTHING;

INSERT INTO visits (patient_id, doctor_id, visit_date, notes) VALUES
  ((SELECT id FROM patients WHERE first_name='John' AND last_name='Doe'), (SELECT id FROM doctors WHERE first_name='Alice' AND last_name='Wong'), '2024-01-10 09:30:00', 'Annual checkup'),
  ((SELECT id FROM patients WHERE first_name='Jane' AND last_name='Roe'), (SELECT id FROM doctors WHERE first_name='Brian' AND last_name='Smith'), '2024-02-12 14:00:00', 'Cough and cold'),
  ((SELECT id FROM patients WHERE first_name='Sam' AND last_name='Green'), (SELECT id FROM doctors WHERE first_name='Carmen' AND last_name='Lopez'), '2024-03-21 11:15:00', 'Follow-up')
ON CONFLICT DO NOTHING;

INSERT INTO diseases (name, icd_code) VALUES
  ('Hypertension', 'I10'),
  ('Type 2 Diabetes', 'E11'),
  ('Acute Bronchitis', 'J20')
ON CONFLICT DO NOTHING;

INSERT INTO diagnoses (visit_id, disease_id) VALUES
  ((SELECT id FROM visits WHERE notes='Annual checkup'), (SELECT id FROM diseases WHERE name='Hypertension')),
  ((SELECT id FROM visits WHERE notes='Follow-up'), (SELECT id FROM diseases WHERE name='Type 2 Diabetes')),
  ((SELECT id FROM visits WHERE notes='Cough and cold'), (SELECT id FROM diseases WHERE name='Acute Bronchitis'))
ON CONFLICT DO NOTHING;
