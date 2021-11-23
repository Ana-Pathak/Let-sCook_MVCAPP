exports.topic = (connections)=>{
        let topic = [];
        connections.forEach(connection => {
          if (!topic.includes(connection.Topic)) {
            topic.push(connection.Topic);
          }
        });
    return topic;
};