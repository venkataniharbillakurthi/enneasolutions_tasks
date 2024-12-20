public class ThirdProgram {
    static String simplify(String path) {
        
        String[] components = path.split("/");
        String[] stack = new String[components.length];
        int stackPointer = 0; 

        for (String dir : components) {
            if (dir.equals("") || dir.equals(".")) {
                
                continue;
            } else if (dir.equals("..")) {
                
                if (stackPointer > 0) {
                    stackPointer--;
                }
            } else {
              
                stack[stackPointer] = dir;
                stackPointer++;
            }
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < stackPointer; i++) {
            result.append("/").append(stack[i]);
        }

        return result.length() > 0 ? result.toString() : "/";
    }

    public static void main(String[] args) {
 
        String str = "/a/./b/../../c/";
        String res = simplify(str);
        System.out.print(res);
    }
}
