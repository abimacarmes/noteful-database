CREATE TABLE notes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    folderId TEXT NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE folders (
    folderId TEXT PRIMARY KEY,
    name TEXT NOT NULL
);