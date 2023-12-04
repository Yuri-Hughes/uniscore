import {USER_LOCAL_STORAGE_KEY, LocalStorageUser, saveUserStorage, getUserStorage, removeUserStorage } from '@/app/api/controllers/database/factory';

describe('User Authentication Utility Functions',()=>{
    beforeEach(()=> {
        window.localStorage.clear();
    });
});

test('saveUserStorage stores user data in local storage',async () => {
    try{
    const user:LocalStorageUser = {id: 1, username: 'usuario test', token: 'tokenone'};
    saveUserStorage(user);

    const storedUser = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '{}');
    expect(storedUser).toEqual(user);
    }catch(error){
       throw new Error(`saveUserStorage test failed: ${error.message}`);
    }


});

test('getUserStorage retrieves user data from local storage', async ()=> {
    try{
        const user:LocalStorageUser = { id: 1, username: 'usuario teste', token: 'tokenone' };
        window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
        const retrievedUser = await getUserStorage();
        expect(retrievedUser).toEqual(user);
    } catch (error) {
        throw new Error(`getUserStorage test failed: ${error.message}`);
    }
  });

  test('getUserStorage returns undefined when no user data is available', async ()=> {
    try{
        const retriveverUser = await getUserStorage();
        expect(retriviedUser).toBeUndefined();

    }catch(error){
        throw new Error(`getUserStorage test failed: ${error.message}`);
    }
  });

  test('removeUserStorage removes user data from local storage',()=> {
    try{
        const user:LocalStorageUser = { id: 1, username: 'usuario teste', token: 'tokenone' };
        window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));

        removeUserStorage();

        expect(window.localStorage.getItem(USER_LOCAL_STORAGE_KEY)).toBeNull();

    }catch(error){
        throw new Error(`removeUserStorage test failed: ${error.message}`);
    }
  });

