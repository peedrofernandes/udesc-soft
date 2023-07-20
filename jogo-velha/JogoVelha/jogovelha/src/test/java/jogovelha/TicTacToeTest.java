package jogovelha;

import org.junit.Test;
import org.junit.Assert;


public class TicTacToeTest {
    TicTacToe game = new TicTacToe();
    Board board = game.getBoard();
    int[][] attempts = {
        {0, 1},
        {0, 0},
        {1, 1},
        {0, 2},
        {2, 0},
        {2, 1},
        {2, 2}
    };

    @Test
    public void drawTest() {
        for (int i = 0; i < attempts.length; i++) {
            if (i % 2 == 0)
                board.setPosition(attempts[i], 1);
            else
                board.setPosition(attempts[i], 2);
        }

        boolean draw = game.draw();
        
        Assert.assertTrue(draw);
    }
}
