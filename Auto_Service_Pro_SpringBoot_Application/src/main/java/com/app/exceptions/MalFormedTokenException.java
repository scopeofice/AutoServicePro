package com.app.exceptions;

@SuppressWarnings("serial")
public class MalFormedTokenException extends Exception{
    public MalFormedTokenException(String msg){
        super(msg);
    }
}
