import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        do {
            System.out.println("1.List \n2.Map \n3.Set \n4. Exiting from the program");
            choice = sc.nextInt();
            switch (choice) {
                case 1: // list
                    ArrayList<String> array1 = new ArrayList<>();
                    array1.add("nihar");
                    array1.add("suresh");
                    array1.add("ramesh");
                    int listchoice;
                    do {
                        System.out.println(
                                "1. Add the Element \n2. Search the Element \n3. Delete the Element by Index \n4. Delete the Element by Value \n5. Display the List Elements in Uppercase (Stream) \n6. Return to memu..");
                        listchoice = sc.nextInt();
                        switch (listchoice) {
                            case 1:
                                System.out.println("Enter the string value into the arraylist: ");
                                Scanner sc1 = new Scanner(System.in);
                                String str = sc1.nextLine();
                                array1.add(str);
                                System.out.println("String added!" + str);
                                break;

                            case 2:
                                System.out.println("Enter the index value to search: ");
                                int search = sc.nextInt();
                                System.out.println(array1.get(search));
                                break;

                            case 3:
                                System.out.println("Enter the index value to remove: ");
                                int index = sc.nextInt();
                                String removedElement = array1.remove(index);
                                System.out.println(removedElement);
                                System.out.println(array1);
                                break;
                            case 4:
                                System.out.println("Enter the String value to remove: ");
                                Scanner sc2 = new Scanner(System.in);
                                String removevalue = sc2.nextLine();
                                array1.remove(removevalue);
                                System.out.println(array1);
                                break;
                            case 5:
                                System.out.println("Display the List Elements in Uppercase (Stream):");
                                array1.stream()
                                        .map(s -> s.toUpperCase())
                                        .forEach(s -> System.out.println(s));
                                break;
                            case 6:
                                System.out.println("Return to memu..");
                                break;
                            default:
                                System.out.println("Values should be between 1 to 5!.......");
                                break;
                        }
                    } while (listchoice != 6);
                    break;
                case 2: // Map
                    Map<Integer, String> map1 = new Hashtable<>();
                    map1.put(0, "kondapur");
                    map1.put(1, "hyd");
                    map1.put(2, "rjy");
                    int mapchoice;
                    do {
                        System.out.println(
                                "Enter the number based on requirements: \n 1.To Add the Element \n 2.To search the element \n 3.To delete the element with value \n4. Enter a substring to filter values \n5. Return to menu..");
                        mapchoice = sc.nextInt();
                        switch (mapchoice) {
                            case 1:
                                System.out.println("Enter the string value into the arraylist: ");
                                System.out.println("Enter the string value to list");
                                String str1 = sc.next();
                                System.out.println("Enter the key value of the list");
                                Integer num = sc.nextInt();
                                map1.put(num, str1);
                                System.out.println("String added!");
                                System.out.println(map1);
                                break;
                            case 2:
                                System.out.println("Enter the element to search");
                                int search = sc.nextInt();
                                System.out.println(map1.get(search));
                                System.out.println(map1);
                                break;
                            case 3:
                                System.out.println("Enter the key  to remove: ");
                                int index = sc.nextInt();
                                String removedIndex = map1.remove(index);
                                System.out.println(removedIndex);
                                System.out.println(map1);
                                break;
                            case 4:
                                System.out.println("Enter a substring to filter values:");
                                String filter = sc.next();
                                System.out.println("Filtered Elements:");
                                map1.entrySet().stream()
                                        .filter(entry -> entry.getValue().contains(filter))
                                        .forEach(entry -> System.out.println(entry.getValue()));
                                break;
                            case 5:
                                System.out.println("Return to menu..");
                                break;
                            default:
                                System.out.println("Values should be between 1 to 4!.......");
                        }
                    } while (mapchoice != 5);
                    break;
                case 3: // Set
                    Set<Integer> set1 = new HashSet<>();
                    set1.add(10);
                    set1.add(30);
                    set1.add(20);
                    int setchoice;
                    do {
                        System.out.println(
                                "Enter the number \n1. Add the value \n2. Enter the search element \n3. Enter the remove element \n4. Display the element in Ascending order(use Stream) \n5. Return to menu");
                        setchoice = sc.nextInt();
                        switch (setchoice) {
                            case 1:
                                System.out.println("Add the value: ");
                                Integer value = sc.nextInt();
                                set1.add(value);
                                System.out.println(set1);
                                break;
                            case 2:
                                System.out.println("Enter the search element: ");
                                int searchvalue = sc.nextInt();
                                Boolean ssv = set1.contains(searchvalue);
                                System.out.println(ssv);
                                break;
                            case 3:
                                System.out.println("Enter the remove element: ");
                                Scanner sc3 = new Scanner(System.in);
                                int removevalue = sc3.nextInt();
                                Boolean rv = set1.remove(removevalue);
                                System.out.println(rv);
                                System.out.println(set1);
                                break;
                            case 4:
                                System.out.println("Display the element in  Ascending Order (Stream):");
                                set1.stream()
                                        .sorted((a, b) -> a.compareTo(b))
                                        .forEach(element -> System.out.println(element));
                                System.out.println("Before sorted set" + set1);
                                break;
                            case 5:
                                System.out.println("Return to menu....");
                                break;
                            default:
                                System.out.println("Values should be between 1 to 5!.......");
                                break;
                        }
                    } while (setchoice != 5);
                case 4:
                    System.out.println("Exiting from the program...");
                default:
                    System.out.println("Values should be between 1 to 4!...");
                    break;
            }
        } while (choice != 4);
        sc.close();
    }
}
