package conv

import (
	"os/user"
	"time"
)

type ConvHeader struct {
	Id             uint64   `json:"id"`
	Name           string   `json:"name"`
	Image          string   `json:"image"`
	Type           string   `json:"type"`
	NbMessageNonLu int      `json:"nbMessageNonLu"`
	LastMessage    *Message `json:"lastMessage"`
}

const CONV_HEAD = `
SELECT 
    c.id,
    CASE 
        WHEN cm.conv_alias IS NOT NULL THEN cm.conv_alias
        ELSE c.name
    END AS conv_name,
    CASE 
        WHEN cm.image_alias IS NOT NULL THEN cm.image_alias
        ELSE c.image
    END AS conv_image,
    c.type,
    cm.nb_no_read_msg
FROM conv as c
JOIN conv_member as cm ON c.id = cm.conv_id
`

type Conv struct {
	Id       uint64       `json:"id"`
	Name     string       `json:"name"`
	Members  []*user.User `json:"members"`
	Messages []*Message   `json:"messages"`
	Image    string       `json:"image"`
}

const CONV = `
SELECT 
c.id, 
IFNULL(cm.conv_alias, c.name || cm.conv_alias),
IFNULL(cm.image_alias, c.image || cm.image_alias)
FROM 'conv' as c
JOIN 'conv_member' as cm ON c.id = cm.conv_id
`

type Message struct {
	Id         uint64    `json:"id"`
	Conv_id    uint64    `json:"conv_id"`
	User_id    uint64    `json:"user_id"`
	User_name  string    `json:"pseudo"`
	User_image string    `json:"user_image"`
	Content    string    `json:"content"`
	Date       time.Time `json:"date"`
}

const MESSAGE = `
SELECT m.id, u.id, m.conv_id, u.pseudo, u.image, m.content, m.date
FROM 'message' as m
JOIN 'user' as u ON u.id = m.user_id
`
