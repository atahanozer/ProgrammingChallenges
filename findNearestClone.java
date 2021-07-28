import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {
    static List<List<Integer>> adj = new ArrayList<>();
    static boolean[] visited;
    static int minCount = 1000000;
    static int count = 0;
    // Complete the findShortest function below.

    /*
     * For the unweighted graph, <name>:
     *
     * 1. The number of nodes is <name>Nodes.
     * 2. The number of edges is <name>Edges.
     * 3. An edge exists between <name>From[i] to <name>To[i].
     *
     */
    static int findShortest(int graphNodes, int[] graphFrom, int[] graphTo, long[] ids, int val) {
        
        for(int i = 0; i < graphNodes; i++) {
            adj.add(new ArrayList<>());
        }
        
        for(int i = 0; i < graphFrom.length; i++) {
            adj.get(graphFrom[i] - 1).add(graphTo[i] - 1);
            adj.get(graphTo[i] - 1).add(graphFrom[i] - 1);
        }
        
        for(int i = 0; i < graphNodes; i++) {
            if (ids[i] == val) {
                count = -1;
                visited = new boolean[graphNodes];
                dfs(i, val, ids);
            }
        }
        
        if (minCount == 1000000) {
            return -1;
        }
        return minCount;
    }
    
    static void dfs(int x, int val, long[] ids) {
        visited[x] = true;
        count++;
        
        List<Integer> neighbours = adj.get(x);
        
        for(int i = 0; i < neighbours.size(); i++) {
            if (!visited[neighbours.get(i)]) {
                if (ids[neighbours.get(i)] == val && count < minCount) {
                    minCount = ++count;
                }
                else if (ids[neighbours.get(i)] != val) {
                    dfs(neighbours.get(i), val, ids);
                }
            }
        }
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String[] graphNodesEdges = scanner.nextLine().split(" ");
        int graphNodes = Integer.parseInt(graphNodesEdges[0].trim());
        int graphEdges = Integer.parseInt(graphNodesEdges[1].trim());

        int[] graphFrom = new int[graphEdges];
        int[] graphTo = new int[graphEdges];

        for (int i = 0; i < graphEdges; i++) {
            String[] graphFromTo = scanner.nextLine().split(" ");
            graphFrom[i] = Integer.parseInt(graphFromTo[0].trim());
            graphTo[i] = Integer.parseInt(graphFromTo[1].trim());
        }

        long[] ids = new long[graphNodes];

        String[] idsItems = scanner.nextLine().split(" ");
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int i = 0; i < graphNodes; i++) {
            long idsItem = Long.parseLong(idsItems[i]);
            ids[i] = idsItem;
        }

        int val = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int ans = findShortest(graphNodes, graphFrom, graphTo, ids, val);

        bufferedWriter.write(String.valueOf(ans));
        bufferedWriter.newLine();

        bufferedWriter.close();

        scanner.close();
    }
}
