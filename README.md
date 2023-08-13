# COMP.CS.510 Web Development 2 - Group project work repository

Hello WebArchers!

This repository is the home for all of your group's code and documentation during this project.  


## Documentation of the system and group's work

For the final submission, all group documentation must be provided in a single PDF file in the root directory of this repository. Do not add any documentation into the course_documentation folder, as that can be used by course personnel to add new content without causing merge issues.

You may use Markdown (.md) or any other documentation method to keep track of documentation during the project, as long as it can be accessed from the repository.

### Required documentation
The documentation required includes the project plan, architectural description of the system, the technologies used, the progress of the group's work, as well as what the group's members learned during this project. Groups also must document where the components of their system are placed in the repository, and how the course personnel can deploy the group's system on their own computers when testing it.

Groups can of course add any extra documentation they feel is useful, and if course personnel finds the documentation useful and well-written, this extra documentation will affect the points positively.

### Project plan
The following subsection tells what should be documented under _Project plan_ section.

#### Course project group information
Start the documentation with identifying information:
- The name, student number, and TUNI email for each group member
- Group name
- GitLab repo URL

#### Working during the project
The initial timetable for the research, design and implementation of the architecture

Which group member(s) will be responsible for what    

How much time each group member promises to group project work per week. Note down each member's promise for committed hours for this project

#### GitLab Issue Boards
**It is recommended that your group uses GitLab’s Issue Board for assigning tasks to members.** Issue Boards offer Kanban-like project management in an easily accessible form.

Using Issue Boards will positively affect the points received.

In GitLab, you can have easy, lightweight project management by using the Issue Board of your repo, [see GitLab’s Issue Board documentation](https://docs.gitlab.com/ee/user/project/issue_board.html). You can find the Issue Board from GitLab’s left panel menu: go to your group repo’s GitLab frontpage -> Issues -> Board.

A short Youtube video introduction to Issue Board [“Announcing the GitLab Issue Board”](https://www.youtube.com/watch?v=UWsJ8tkHAa8). You should be able to see the basic idea and functioning.

When using the Issue Board, your group should first discuss what lists you would like to use, “To do”, "Research", and “Doing” are the defaults that are offered to be created for a new issue board. Then, whenever your group starts new tasks, or you have an issue (bug, improvement, etc…) with your code, then you should create issues in GitLab for these. Then your group assigns each issue/task to group member(s). The assigned student is responsible for handling the issue, and moving it from that list to next in the Issue Board, until it is in the “Closed”/"Done"/"Revied" list.

Your group should decide who and when will create the GitLab issues and assign them to members.

### Documentation of the created system
Following describes what needs to be documented during the project.

Those groups that use other technologies/architecture than described need to apply these instructions to fit their choices.

#### System architecture
The focus should be on applying what has been learned in the course about Web Architecture. Using proper architectural descriptions and UML diagrams would be appropriate, but the groups are welcome to use any reasonable way of describing the system.

Matters to describe include architectural patterns, components, component's roles, communication within the system and with external components, and others things, that the group finds important when describing the architecture. Describe the system with enough detail, so that a technical person with no prior knowledge of the system would be able to understand it. Use images and diagrams whenever you are able.

It is important to evaluate the architecture and compare it to other possible architectures. Elaborate on the strengths and weaknesses of this architecture when compared to its purpose and tasks as described in the assignment document. Consider other architectures that would have been able to fulfill the system's described purpose and tasks. This part is where your group gets to explore architectures that could have been used to produce a system with the same or at least similar functionality. The sky is the limit here, get creative!

#### Used technologies
Description of the technologies used in the system (Node, RabbitMQ, AMPQ, ...), how the technologies were used in the project, and the group's view of the technologies from your use. Could other/better alternatives have been used? Or is there an alternative that would have been more interesting to the group?

#### How the produced system can be tested
Here group describes how course personnel can test their system. A complete HOWTO on running your system, with easily copy-pastable examples.

### Learnign during the project
A group learning diary, where group members note down the learning during the project. Short descriptions of who, what, and when are sufficient. What could be a link to GitLab Issue, that has more information.

This information is interesting to the course personnel, too. We get to see if the project enabled learning as designed.

## Coding during the project
Code for each component _must_ be placed in its own directories to maintain a healthy repository. For the groups' convenience sub-directories for _server-a_, _rabbitmq_, and _server-b_ have been created in the repository. Groups can choose to use this directory structure, or groups can remove/modify it to their needs, as long as the code for each component is placed in its own directory.

The directories have files like _Dockerfiles_ that groups can use as the basis of their work, but as with the directory structure, the groups are free to do with them as they will. Groups should however read through the files, even if they choose to remove them, as they contain help and comments.

Docker Compose file _'docker-compose.yml'_ must be placed in the root directory of the repository where it is now.

Commenting your code is important in places where the code might not be immediately obvious. Comments should be detailed enough that people outside your group can understand the code with the help of the comments.

The `docker-compose.yml` -file and other files have comments by the course personnel. Groups can remove these comments if they wish to do so.
