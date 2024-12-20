
// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.util.Scanner;

public class FirstProgram {
    public static void main(String[] args) {
        System.out.println("Enter a Number ");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("The Square root of " + n + "is" + sqaureRoot(n));

    }

    public static double sqaureRoot(int num) {
        double t;
        double sqrtroot = num / 2;
        do {
            t = sqrtroot;
            sqrtroot = (t + (num / t)) / 2;
        } while ((t - sqrtroot) != 0);
        return sqrtroot;
    }
}