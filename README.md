NEAT, which stands for NeuroEvolution of Augmenting Topologies, is a genetic algorithm developed for evolving artificial neural networks.
If we apply this algorithm to the game Flappy Bird we can observe some very intelegent behavior.


We start with a population of birds that have completely random Neural Networks that they use as their brain to decide one thing, to jump or not to jump. Each bird takes in as input three things: the horizontal distance to the next pipe, the vertical distance to the top of the next pipe, and
the vertical distance to the bottom of the next pipe. With this information the bird will send those values through their brain and if the output neuron is excited enough
the bird will jump, otherwise the bird will do nothing.


If you look carefully the brain in the top left corner has nodes and connections to other nodes. The color and thickness of the connection determines what type of connection it is. Green means positive and Red means negative connection, 
The thickness and brightness of the connection determines how strong that positive or negative conneciton is. 


After every generation, every bird besides the best performing bird will be killed off and a new generation of birds will be born with a randomly mutated version of the best birds brain.
Keeping the best performing bird means that the birds will always be improving and never regressing. All of this is happening completly randomly almost mimicing what happens in nature.

