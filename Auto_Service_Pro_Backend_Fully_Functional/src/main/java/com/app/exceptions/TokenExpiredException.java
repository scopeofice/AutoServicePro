package com.app.exceptions;

@SuppressWarnings("serial")
public class TokenExpiredException extends Exception{
    public TokenExpiredException(String msg){
        super(msg);
    }
}
