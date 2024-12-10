# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Build Docker

docker build -t app-navidad .
docker run -p 9094:80 app-navidad --name app-navidad-web

sudo nginx -t
sudo systemctl restart nginx
sudo nano /etc/nginx/sites-available/bsf.pe

location @navidad {
rewrite ^/navidad(.\*) /navidad/dist/index.html;
}

    location ^~ /navidad {
        alias /home/devstaff/webapps/navidad/dist/;
        index index.php index.html index.htm;
        try_files $uri $uri/ @navidad;

        location ~ \.php$ {
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $request_filename;
            fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        }

        location ~* \.(?:css|gif|htc|ico|js|jpe?g|png|swf)$ {
            expires max;
            log_not_found off;
            tcp_nodelay off;
            open_file_cache max=1000 inactive=120s;
            open_file_cache_valid 45s;
            open_file_cache_min_uses 2;
            open_file_cache_errors off;
        }
        error_log /home/devstaff/logs/bsf_blog_error.log;
    }
