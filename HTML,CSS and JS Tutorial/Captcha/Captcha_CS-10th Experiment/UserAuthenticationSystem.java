import java.util.Scanner;
import java.util.Random;

public class UserAuthenticationSystem {

    // Hardcoded user credentials for demonstration purposes
    private static final String USERNAME = "user";
    private static final String PASSWORD = "password";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter username: ");
        String enteredUsername = scanner.nextLine();

        System.out.print("Enter password: ");
        String enteredPassword = scanner.nextLine();

        if (authenticateUser(enteredUsername, enteredPassword)) {
            if (verifyCaptcha(scanner)) {
                System.out.println("Authentication successful! Access granted.");
            } else {
                System.out.println("Captcha verification failed. Access denied.");
            }
        } else {
            System.out.println("Invalid username or password. Access denied.");
        }
        scanner.close();
    }

    // Method to authenticate user based on username and password
    private static boolean authenticateUser(String username, String password) {
        return USERNAME.equals(username) && PASSWORD.equals(password);
    }

    // Method to generate and verify CAPTCHA
    private static boolean verifyCaptcha(Scanner scanner) {
        Random random = new Random();
        int captcha = random.nextInt(9000) + 1000; // Generate a 4-digit random number

        System.out.println("CAPTCHA: " + captcha);
        System.out.print("Enter CAPTCHA: ");
        int enteredCaptcha = scanner.nextInt();

        return captcha == enteredCaptcha;
    }
}
