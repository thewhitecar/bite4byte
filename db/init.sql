CREATE TABLE pantry (
    id SERIAL PRIMARY KEY,
    pantry_name TEXT
);

CREATE TABLE coordinator (
    id SERIAL PRIMARY KEY,
    name TEXT, 
    username TEXT,
    password TEXT,
    pantry_id INTEGER REFERENCES pantry
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    item_name TEXT
);

CREATE TABLE item_pantry_link (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES item,
    pantry_id INTEGER REFERENCES pantry,
    quantity INTEGER
);

CREATE TABLE family (
    id SERIAL PRIMARY KEY,
    family_name TEXT,
    picked_up BOOLEAN,
    last_pickup_date DATE,
    pantry_id INTEGER REFERENCES pantry
);

CREATE TABLE historical_pantry_data (
    id SERIAL PRIMARY KEY,
    pantry_id INTEGER REFERENCES pantry
);