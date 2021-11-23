exports.index = (req, res)=>{
      let connections = model.find();
      res.render('./connection/index', {connections});
  };

  exports.contact = (req, res)=>{
      let connections = model.find();
      res.render('./connection/contact', {connections});
  };

  exports.about = (req, res)=>{
      let connections = model.find();
      res.render('./connection/about', {connections});
  };