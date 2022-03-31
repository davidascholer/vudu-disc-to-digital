import React from "react";

import View from "./View";

function TextInput({ icon, onFocus, style, ...otherProps }) {

  return (
    <View style={styles.container}>
      {/* {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={appContext.colorTheme.medDark}
          style={styles.icon}
        />
      )} */}
      {/* <TextInput
        onFocus={onFocus}
        placeholderTextColor={'blue'}
        style={{}}
        {...otherProps}
      /> */}
      <input style={styles.input} type={otherProps.type} value={otherProps.placeholder}></input>
    </View>
  );
}

const styles = {
  container: {
    alignItems:"center",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent:"flex-start",
    marginVertical: 10,
    padding: 15,
    width:"100%",
  },
  icon: {
    marginRight: 10,
  },
  input:{
      testTransform:"lowercase",
  }
};

export default TextInput;
