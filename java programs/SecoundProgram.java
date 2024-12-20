import java.util.Scanner;

public class SecoundProgram {
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int decimalNumber = sc.nextInt();
        String binaryNumber = Integer.toBinaryString(decimalNumber);

        System.out.println("The binary equivalent is: " + binaryNumber);

        int count = 0;

        while ((decimalNumber & 1) == 0 && decimalNumber != 0) {

            count++;

            decimalNumber >>= 1; 

        }
        System.out.println(count);

    }

}


   