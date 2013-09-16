/**
 * @author TonyGuu
 * 
 * DESC:
 * 1.the code is copied from http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/examples.html
 * 2.
 * 
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

var ec2 = new AWS.EC2();

var params = {
  ImageId: 'ami-0358ce33', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't1.micro',
  MinCount: 1, MaxCount: 1
};

// ##Create the instance(specified number of instances)
ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  var groupName = data.Groups[0];
  
  console.log("Created instance", instanceId , ", GroupName : ",groupName);

  // ##Add tags to the instance
  // use tags to manage the sources
  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: "OpenTeamTestWebServer"}
  ]};
  //Adds or overwrites tags for the specified resources.
  ec2.createTags(params, function(err) {
    console.log("Tagging instance", err ? "failure" : "success");
  });
});


/*
 * [Tagging Your Amazon EC2 Resources]
 * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
 * 
 * 
 * */

