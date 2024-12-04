import java.util.Stack;

public class ThirdProgram {
    static String simplify(String path) {
        Stack<String> stack = new Stack<>();

        String[] components = path.split("/");

        for (String dir : components) {
            if (dir.equals("") || dir.equals(".")) {
                continue;
            } else if (dir.equals("..")) {

                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else {

                stack.push(dir);
            }
        }


        StringBuilder result = new StringBuilder();
        for (String dir : stack) {
            result.append("/").append(dir);
        }


        return result.length() > 0 ? result.toString() : "/";
    }

    public static void main(String[] args) {
        String str = "/a/./b/../../c/";
        String res = simplify(str);
        System.out.print(res);
    }
}

// The Worst Time Complexity is O(n)
// The Space Complexity is O(n)
