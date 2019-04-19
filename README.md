# **Schimata (Inventory Management Simulator)**

### **Background and Overview**

Inventory Management Simulator (IMS) is aimed to test the problem-solving skills of individuals who can solve the puzzle by putting shapes together that would fix, in a logical manner, inside of a square. The shapes are inspired from the popular game of [Tetris](https://en.wikipedia.org/wiki/Tetris).

Starting off with a 5 x 5 grid, each cell is a 1 x 1 block and the rules to the game are as follow:

  1) Shapes cannot overlap each other
  2) Every cell within the grid needs to be occupied for the level to be completed.

### **Functionality**

With IMS, users will be able to do the following:

* Start, pause, and reset the game grid whenever the user chooses to do so during the game
* Select shapes by clicking on them and having the shape stick to the mouse until they click down again

### **Wireframe**

![Wireframe](https://github.com/Yamithorn/Schimata/blob/master/images/Wireframe.png)

### **MVPs**

* Basic shapes and an interactive interface
* Player can click on shape and have it move with the mouse
* Player can rotate the shape in a 90 degree rotation (forwards or reverse)
* Filling the entire grid causes a "Complete" to appear

### **Technologies**

### **Architecture**

### **Development/Implementation Timeline**

**Day 1 (4/11/2019):**
- [X] Finish brainstorming the game design, flesh out the concept, and complete the proposal
- [X] Finish the project skeleton for the page to load with the grid
- [X] Finish drawing the shapes to be used by the player

**Day 2 (4/12/2019):**
- [X] Have the shapes appear on screen in a designated location for a player to pick from
- [X] Allow the shapes to be clicked by the mouse and dragged along with it

**Weekend (4/13/2019 - 4/14/2019):**
- [X] Have the shapes snap into the grid when it is entirely placed inside of it
- [X] Prevent shapes from overlapping each other when being placed inside of the grid
- [X] Have the shapes return to their original starting position when overlapping on another shape in the grid
- [X] When all the cells within the grid have been filled, have a congratulatory pop up appear
- [ ] After finishing the level, prompt the user to go to the next level
- [ ] When at the next level, it depopulates the grid and fetches new shapes to play again

**Day 3 (4/15/2019):**
- [ ] Polish the game and add colors/animations to the shapes
