FROM python:3.13.14-slim

WORKDIR /usr/src/djangoAirBnb/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

RUN PIP INSTALL --UPGRADE PIP

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .
