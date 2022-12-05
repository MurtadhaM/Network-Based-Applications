package org.findasnake.spring;

public class Snake {
    String name;
    String color;
    String length;


    Snake (String name, String color, String length, String weight) {
        this.name = name;
        this.color = color;
        this.length = length;

    }


    Snake(String name){
        this.name = name;
    }
    @Override
    public String toString() {
        return this.name;
    }

}


