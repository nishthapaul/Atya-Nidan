use atya_nidan;

ALTER TABLE Form_Skeleton RENAME Form;

ALTER TABLE Form DROP COLUMN file;

ALTER TABLE Form RENAME COLUMN form_skeleton_id to form_id;