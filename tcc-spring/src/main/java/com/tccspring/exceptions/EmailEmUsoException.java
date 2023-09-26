package com.tccspring.exceptions;

public class EmailEmUsoException extends RuntimeException {
    public EmailEmUsoException(String email) {
        super("O email '" + email + "' já está em uso.");
    }


}
