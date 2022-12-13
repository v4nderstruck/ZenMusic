export interface PickError {
  message: String,
}

// pass a list of nested selectors (field name), function will traverse obj and pick the 
// value if that field checked against the type. Returns PickError if not of type or 
// not in obj. The validator lambda will be used to check the obj before return.
export function cherryPick<Type>(
  obj: any,
  selectors: String[],
  validator: (item: any) => boolean): Type | PickError {
  let pObj = obj;
  for (let i = 0; i < selectors.length; i++) {
    const selector = selectors[i];
    if (pObj[selector as string] !== undefined) {
      pObj = pObj[selector as string];
    } else {
      return { message: `PickError: Field ${selector} does not exists` }
    }

    if (i == selectors.length - 1) {
      return validator(pObj) ? pObj as Type : { message: "PickError returned false" };
    }
  }
  return {
    message: `PickError: Empty selectors list`
  }
}


