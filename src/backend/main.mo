import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type ServiceType = {
    #consulting;
    #development;
    #design;
    #marketing;
    #other;
  };

  type Enquiry = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    serviceType : ServiceType;
    submissionTime : Int;
  };

  module Enquiry {
    public func compareByTimestamp(a : Enquiry, b : Enquiry) : Order.Order {
      Int.compare(a.submissionTime, b.submissionTime);
    };
  };

  let enquiriesList = List.empty<Enquiry>();

  public shared ({ caller }) func submitEnquiry(
    name : Text,
    phone : Text,
    email : Text,
    message : Text,
    serviceType : ServiceType,
  ) : async () {
    let enquiry : Enquiry = {
      name;
      phone;
      email;
      message;
      serviceType;
      submissionTime = 0; // Placeholder, as time capture is not implemented
    };
    enquiriesList.add(enquiry);
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    let grouped = enquiriesList.toArray().sort(Enquiry.compareByTimestamp);
    grouped;
  };

  public query ({ caller }) func getEnquiryByEmail(email : Text) : async Enquiry {
    switch (enquiriesList.values().find(func(enq) { enq.email == email })) {
      case (null) { Runtime.trap("Enquiry not found") };
      case (?enquiry) { enquiry };
    };
  };
};
