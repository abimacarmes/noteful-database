DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    folderId TEXT REFERENCES folders(folderId) NOT NULL,
    content TEXT NOT NULL
);
