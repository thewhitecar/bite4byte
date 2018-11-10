CREATE TABLE pantry (
    id INTEGER PRIMARY KEY,
    pantry_name TEXT
);

CREATE TABLE coordinator (
    id INTEGER PRIMARY KEY,
    name TEXT, 
    username TEXT,
    password TEXT,
    pantry_id INTEGER REFERENCES pantry
);

CREATE TABLE item (
    id INTEGER PRIMARY KEY,
    item_name TEXT
);

CREATE TABLE item_pantry_link (
    id INTEGER PRIMARY KEY,
    item_id INTEGER REFERENCES item,
    pantry_id INTEGER REFERENCES pantry,
    quantity INTEGER
);

CREATE TABLE family (
    id INTEGER PRIMARY KEY,
    family_name TEXT,
    picked_up BOOLEAN,
    last_pickup_date DATE,
    pantry_id INTEGER REFERENCES pantry
);

CREATE TABLE historical_pantry_data (
    id INTEGER PRIMARY KEY,
    pantry_id INTEGER REFERENCES pantry
);