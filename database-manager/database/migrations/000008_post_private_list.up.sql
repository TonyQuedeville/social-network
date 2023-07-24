-- file: 000008_post_private_list.up.sql

-- Create the "post_private_list" table
CREATE TABLE IF NOT EXISTS post_private_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
