FROM php:7-fpm-alpine

RUN apk add --no-cache composer

COPY ./ /opt/app
WORKDIR /opt/app

RUN composer install
RUN cp .env.example .env
RUN php artisan key:generate
RUN cp storage/store.json storage/app/

ENTRYPOINT ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]