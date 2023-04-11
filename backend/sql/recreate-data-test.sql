
--Recreating the test data

TRUNCATE TABLE Account;

INSERT INTO Account (email, password_hash) VALUES
    ('user@example.com', '$2a$04$frBxya4hN6G0Ku306bhUhuCTuSS08tVYMe2R5zkgkllUtOdwrXYRK'), --password
    ('foobar@example.com', '$2a$04$MMarq/DNoB41u4IjKO3.j.IUrkg/hemWCkvxRbA8Q.qcQaJKQVTiC'), --foobar
    ('admin@example.com', '$2a$04$qflCmH7bFx3GEhjJA9zrLOjPGI5o3iDTgtOIbXJ7AIJnt3Om6v23i'), --123456
    ('hello@example.com', '$2a$04$9mr0TYe6bh8jH6F7idGj5u9SaoKBvP3UDvPSb9bu8/3MZvGfKoGse') --world
;
