/**
  *
  * main() wird aufgerufen, wenn Sie diese Aktion ausführen.
  * 
  * @param OpenWhisk-Aktionen akzeptieren einen einzigen Parameter,
  *        muss ein JSON-Objekt sein.
  *
  * @return muss ein JSON-Objekt sein.
  *         Wird die Ausgabe dieser Aktion sein.
  *
  */
function main() {
    return { "message": "hello world" };
}