# syntax=docker/dockerfile:1

FROM node:23.4.0-slim@sha256:dd44ec6132f29fbfd39151265bd3702a77caad72aa4cab9b00e40edf60d28ab6
ENV TERM="xterm"
ARG USERNAME=developer
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN unlink /usr/local/bin/npm \
    && apt-get update \
    && apt-get --no-install-recommends install -y \
        ca-certificates \
        curl \
        git \
        gnupg2 \
        libnss3 \
        libdbus-1-3 \
        libatk1.0-0 \
        libgbm-dev \
        libasound2 \
        libxrandr2 \
        libxkbcommon-dev \
        libxfixes3 \
        libxcomposite1 \
        libxdamage1 \
        libpango-1.0-0 \
        libcairo2 \
        libcups2 \
        libatk-bridge2.0-0 \
        openssh-client \
        sudo \
        watch \
        wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean
RUN deluser --remove-home node \
    && groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID --create-home $USERNAME --shell /bin/bash \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && mkdir -p /home/$USERNAME/.cache/JetBrains/RemoteDev/dist \
    && chown -R $USERNAME:$USERNAME /home/$USERNAME
USER $USERNAME
RUN git config --global commit.gpgsign true
