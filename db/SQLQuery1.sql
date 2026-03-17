
use call_updb;
CREATE TABLE login_table (
    id INT  PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email_id VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);