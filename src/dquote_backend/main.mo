import HashMap "mo:base/HashMap";

import Text "mo:base/Text";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor {
  type QuoteData={
    author:Text;
    advice:Text;
  };
  
  var map = HashMap.HashMap<Text,QuoteData >(0, Text.equal, Text.hash);
  
  stable var arrayOfMap : [(Text, QuoteData)] = [];

  stable var quoteid:Nat=0;

  stable var id:Text = Nat.toText(quoteid);
  
  public func insertData(info:QuoteData) : async Text{
    let userInfo:QuoteData={
    author = info.author;
    advice = info.advice;
    };
    quoteid +=1;
    id:= Nat.toText(quoteid);
    map.put(id,userInfo);
    return "Data Inserted Successfully";
  };

  public query func fetch(id:Text) : async QuoteData {
    
    let data:QuoteData = switch(map.get(id)) {
      case(?value) {value };
      case(null) {throw Error.reject("No Data Fount") };
    };

    return data;
  };

  
  public query func getAll() : async [(Text,QuoteData)] {
    let allData = Iter.toArray(map.entries());
    return allData;
};


  public func del(id : Text) : async Text {
    
    map.delete(id);

    return "Data Deleted!";
  };

// For Creating Stable HashMap to store data;

  system func preupgrade() {
        arrayOfMap := Iter.toArray(map.entries());
    };

  system func postupgrade() {
        map := HashMap.fromIter<Text, QuoteData>(arrayOfMap.vals(), 0, Text.equal, Text.hash);
        arrayOfMap := [];
    };
};