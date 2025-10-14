-- Seed neighborhoods for default tenant
INSERT INTO neighborhoods (tenant_id, name, description, settings) 
VALUES ('5cf30803-3d8e-47c1-84ed-ec338d4f8979', 'Almendro', 'Primary residential area', '{}') 
ON CONFLICT (name, tenant_id) DO NOTHING;

INSERT INTO neighborhoods (tenant_id, name, description, settings) 
VALUES ('5cf30803-3d8e-47c1-84ed-ec338d4f8979', 'Bamboo', 'Secondary residential area', '{}') 
ON CONFLICT (name, tenant_id) DO NOTHING;

-- Seed lots for Almendro
INSERT INTO lots (neighborhood_id, lot_number, status) 
SELECT id, 'LOT101', 'available' FROM neighborhoods WHERE name = 'Almendro' ON CONFLICT DO NOTHING;

INSERT INTO lots (neighborhood_id, lot_number, status) 
SELECT id, 'LOT102', 'available' FROM neighborhoods WHERE name = 'Almendro' ON CONFLICT DO NOTHING;

INSERT INTO lots (neighborhood_id, lot_number, status) 
SELECT id, 'LOT103', 'available' FROM neighborhoods WHERE name = 'Almendro' ON CONFLICT DO NOTHING;

-- Seed lots for Bamboo
INSERT INTO lots (neighborhood_id, lot_number, status) 
SELECT id, 'LOT201', 'available' FROM neighborhoods WHERE name = 'Bamboo' ON CONFLICT DO NOTHING;

INSERT INTO lots (neighborhood_id, lot_number, status) 
SELECT id, 'LOT202', 'available' FROM neighborhoods WHERE name = 'Bamboo' ON CONFLICT DO NOTHING;
