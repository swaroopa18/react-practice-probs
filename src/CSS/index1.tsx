// Center align a div inside another div
// 1. Create a div inside another div
// 2. Set the display property of the outer div to flex
// 3. Set the justify-content property of the outer div to center
// 4. Set the align-items property of the outer div to center
// 5. Set the width and height of the outer div

const Component1 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "red" }}
      ></div>
    </div>
  );
};

//Using table-cell
// 1. Create a div inside another div
// 2. Set the display property of the outer div to table-cell
// 3. Set the text-align property of the outer div to center
// 4. Set the vertical-align property of the outer div to middle
// 5. Set the width and height of the outer div

const Component2 = () => {
  return (
    <div
      style={{
        display: "table-cell",
        textAlign: "center",
        verticalAlign: "middle",
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "red" }}
      ></div>
    </div>
  );
};

//Other approaches
// 1. Using display: grid 
const Component3 = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "red" }}
      ></div>
    </div>
  );
}

// 2. Using position: absolute

const Component4 = () => {
    return (
        <div
        style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            backgroundColor: "lightgray",
        }}
        >
        <div
            style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
            backgroundColor: "red",
            }}
        ></div>
        </div>
    );
    };
// 3. Using position: relative

const Component5 = () => {
    return (
        <div
        style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            backgroundColor: "lightgray",
        }}
        >
        <div
            style={{
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            margin: "auto",
            width: "50px",
            height: "50px",
            backgroundColor: "red",
            }}
        ></div>
        </div>
    );
    }
