# one-goal-app
An app designed to help users keep a record of one goal for the day.
Useful for standups.

## To set up locally:
### Using NGINX for reverse proxy
To set it up, add to the server block: 
```
location / {
    proxy_pass http://127.0.0.1:3000;
    root   html;
    index  index.html index.htm;
}
```
```
location /data {
    proxy_pass http://127.0.0.1:3100/data.json;
}
```
