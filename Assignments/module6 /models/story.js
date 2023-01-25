const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const stories = [
    {
        id: '1',
        title: 'The Snake & The Fish',
        content: `Once upon a time, in a small pond in the middle of a dense forest, there lived a snake named Sammy. Sammy was a sneaky, cunning snake who loved nothing more than to sneak up on the other inhabitants of the pond and give them a good scare.  One day, as Sammy was slithering through the tall grass around the edge of the pond, he spotted a small fish swimming in the shallow water. The fish was so focused on its own business that it didn't even notice Sammy approaching.  With a sly grin on his face, Sammy crept closer and closer to the fish, getting ready to pounce. But just as he was about to strike, the fish suddenly turned around and looked right at him.  "Hello there, Snake," the fish said, with a twinkle in its eye. "I've been expecting you."  Sammy was taken aback. He had never met a fish that could talk before, let alone one that seemed to be expecting him.  "Who are you?" he asked, trying to regain his composure.  "I am a wise fish," the fish replied. "I have lived in this pond for many years, and I know all of its secrets. I have watched you, Snake, and I know that you are not a bad creature, despite your love of scaring others."  Sammy was touched by the fish's words. He had never thought of himself as a bad creature, and it was nice to hear that someone saw him in a different light.  "Thank you," he said, "I appreciate that. But I don't understand why you were expecting me."  "I have been expecting you," the fish said, "because I have a task for you. You see, there is a great danger threatening our pond, and I believe that you are the only one who can stop it."  Sammy was intrigued. He had never been given a task before, and he was eager to prove himself.  "What is the danger?" he asked.`,
        author: 'Murtadha Marzouq',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {

        id: '2',
        title: 'The Student & The Impossible Test',
        content:`Murtadha was in his graduate school when he faced his most impossible challenge... this piece of shit project!`,
        author: 'Murtadha Marzouq',
        createdAt: DateTime.local(2021, 2 ,12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    }
];
exports.find = function(){
    return stories;
};

exports.findById = function(id){
    return stories.find(story => story.id === id);
};

exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory){
    let story = stories.find(story=>story.id === id);
    if(story){
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
}
};

exports.deleteById = function(id){
    let index = stories.findIndex(story => story.id === id);
    if(index !== -1){
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

