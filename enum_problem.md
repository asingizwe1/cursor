12. Given the Rust enum `enum ServerRequest { GetData(String), PostData(String, String), NoOp }`, how would you create an instance of the `GetData` variant with the ID "user123"?

new ServerRequest::GetData("user123")

ServerRequest::GetData(String::from("user123")) -> valid

ServerRequest::GetData = String::from("user123");

ServerRequest.GetData("user123")
