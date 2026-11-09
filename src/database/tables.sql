CREATE TABLE clientes(
    id int auto_increment primary key,
    tipo enum('PF','PJ') not null,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    telefone varchar(15) not null,
    cpf char(11) unique,
    cnpj char(14) unique,
    data_nascimento date,
    razao_social varchar(100),
    nome_fantasia varchar(100),
    inscricao_estadual varchar(20),
    estado_civil enum ('solteiro','casado','divorciado','viuvo','uniao_estavel'),
    ativo boolean not null default true,
    limite_credito decimal(12,2) not null default 0,
    observacoes varchar(500),
    criado_em timestamp not null default current_timestamp,
    atualizado_em timestamp not null default current_timestamp on update current_timestamp,
    constraint ck_cliente_pfpj check ((tipo='PF' AND cpf is not null and cnpj is null) OR (tipo='PJ' and cnpj is not null and cpf is null))
);

CREATE TABLE usuarios(
    id UUID NOT NULL DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    status enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
    tipo enum('Admin','User') NOT NULL DEFAULT 'User',
    data_criacao DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    data_alteracao DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) 
                   ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id), CONSTRAINT uk_usuarios_email UNIQUE (email)               
);