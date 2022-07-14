class PersistData {
  constructor(storageName = 'store', data = {}) {
    this.storageName = storageName;
    this.storage = this.load();
    this.save(data);
  }

  set = (key, value) => {
    this.storage[key] = value;
    this.save();
  }

  get = (key) => this.storage[key];

  remove = (key) => {
    this.storage[key] = null;
  };

  load = () => JSON.parse(localStorage.getItem(this.storageName)) || {}

  save = (data = this.storage) => {
    let newData = this.load();
    newData = { ...newData, ...data };
    localStorage.setItem(
      this.storageName,
      JSON.stringify(newData),
    );
  };
}

export default PersistData;
