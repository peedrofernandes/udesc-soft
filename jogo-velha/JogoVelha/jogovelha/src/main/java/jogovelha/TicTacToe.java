/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author Administrador
 */
package jogovelha;
import java.util.ArrayList;
import java.util.Scanner;

public class TicTacToe {
    private int turn=1, who=1;
    private Player player1;
    private Player player2;
    
    private Board board;
    public Scanner input = new Scanner(System.in);
    
    public TicTacToe() {
      this.board = new Board();
    }
    
    public void startGame() {
      while ( Play() );
    }
    
    public void startPlayers(){
        System.out.println("Who will be player1 ?");
        if(choosePlayer() == 1)
            this.player1 = new Human(1);
        else
            this.player1 = new Computer(1);
        
        System.out.println("----------------------");
        System.out.println("Who will be Player 2 ?");
        
        if(choosePlayer() == 1)
            this.player2 = new Human(2);
        else
            this.player2 = new Computer(2);
        
    }
    
    public int choosePlayer(){
        int option=0;
        
        do{
            System.out.println("1. Human");
            System.out.println("2. Computer\n");
            System.out.print("Option: ");
            option = input.nextInt();
            
            if(option != 1 && option != 2)
                System.out.println("Invalid Option! Try again");
        }while(option != 1 && option != 2);
        
        return option;
    }
    
    public boolean Play(){
        board.showBoard();
        if(won() == 0 ){
            System.out.println("----------------------");
            System.out.println("\nTurn "+turn);
            System.out.println("It's turn of Player " + who() );
            
            if(who()==1)
                player1.play(board);
            else
                player2.play(board);
            
            
              if (draw()) {
                System.out.println("Empate!");
                return false;
              }
              this.who++;
            return true;
        } else{
            if(won() == -1 )
                System.out.println("Player 1 won!");
            else
                System.out.println("Player 2 won!");
            
            return false;
        }
            
    }
    
    public int who(){
        if(who%2 == 1)
            return 1;
        else
            return 2;
    }
    
    public int won(){
        if(board.checkLines() == 1)
            return 1;
        if(board.checkColumns() == 1)
            return 1;
        if(board.checkDiagonals() == 1)
            return 1;
        
        if(board.checkLines() == -1)
            return -1;
        if(board.checkColumns() == -1)
            return -1;
        if(board.checkDiagonals() == -1)
            return -1;
        
        return 0;
    }

    public boolean draw() {
        if(board.fullBoard())
          return true;

        ArrayList<ArrayList<Integer>> emptyCells = board.getEmptyCells();
        if (emptyCells.size() <= 2) {
          int[] attempt1 = {emptyCells.get(0).get(0), emptyCells.get(0).get(1)};
          int[] attempt2 = { emptyCells.get(1).get(0), emptyCells.get(1).get(1) };
          
          board.setPosition(attempt1, 1);
          board.setPosition(attempt2, 2);
          
          if (this.won() == 0)
            return true;
          
          board.setPosition(attempt1, 2);
          board.setPosition(attempt2, 1);

          if (this.won() == 0)
            return true;

          board.setPosition(attempt1, 0);
          board.setPosition(attempt2, 0);
        }
        
        return false;
    }
    
    public static void main(String args[]) {
      TicTacToe game = new TicTacToe();
      game.startPlayers();
      game.startGame();
    }

    public Board getBoard() {
        return this.board;
    }
}