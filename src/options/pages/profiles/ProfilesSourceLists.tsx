import React, { type FC } from 'react';
import { Button } from '../../../components/Button';
import { IconDatabaseExport, IconDatabaseImport, IconPlus, IconTrash } from '@tabler/icons-react';
import { ICON_SIZE } from '../../../constants';

interface SourceList {
  url: string
}

export interface ProfilesSourceListsProps {

}

export const ProfilesSourceListsPrompts: FC<ProfilesSourceListsProps> = () => {
  const importList = (): void => {
    console.log('Import'); // todo import list
  };

  const exportLists = (): void => {
    console.log('Export'); // todo export lists
  };

  const deleteList = (url: string): void => {
    console.log('Delete', url); // todo delete list
  };

  const [inputListUrl, setInputListUrl] = React.useState('');
  const addListForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log('Add list', inputListUrl); // todo add list
    setInputListUrl('');
  };

  const userSourceLists: SourceList[] = [
    { url: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples.oprm' },
    { url: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples1.oprm' },
    { url: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples2.oprm' },
    { url: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples3.oprm' },
    { url: 'https://raw.githubusercontent.com/Craifter/oprm/main/examples/examples4.oprm' }
  ];

  return (<>
    <div className={'md:flex gap-2'}>
      <p className={'dark:text-white text-lg'}>
        Lists with prompts can be imported. These list are synchronized with the browser profile
      </p>
      <div className={'flex-1 gap-2 mt-4 md:mt-0'}>
        <div className={'flex md:flex-row-reverse flex-wrap gap-2'}>
          <Button onClick={importList} icon={<IconDatabaseImport size={ICON_SIZE}/>}> Import Lists </Button>
          <Button onClick={exportLists} icon={<IconDatabaseExport size={ICON_SIZE} />}> Export Lists </Button>
        </div>
      </div>
    </div>
    <div className={'mt-4'}>
      <form onSubmit={addListForm}>
        <div className={'flex'}>
          <div className="relative z-0 w-full mb-6 group">
            <input id="sourcelist_url"
                   value={inputListUrl}
                   onChange={(e) => { setInputListUrl(e.target.value); }}
                   className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   name="sourcelist_url"
                   type="url"
                   placeholder=" "
                   required/>
            <label htmlFor="sourcelist_url"
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Source List URL
            </label>
          </div>
          <div className={'ml-4 mt-2'}>
            <Button icon={<IconPlus size={ICON_SIZE} />}> Add </Button>
          </div>
        </div>
      </form>
    </div>
    <div className={'mt-4'}>
      <h3 className={'dark:text-white text-lg'}>User Source Lists</h3>
      {userSourceLists.map((list) => (
        <div className={'flex gap-2 my-2 p-2 hover:bg-black/10 rounded-md'} key={list.url}>
          <p className={'dark:text-white text-lg overflow-y-auto'}>{list.url}</p>
          <div className={'flex-1 ml-auto flex flex-row-reverse'}>
            <Button icon={<IconTrash size={ICON_SIZE} onClick={() => { deleteList(list.url); }} />} extendButtonClass={'pr-3'}></Button>
          </div>
        </div>
      ))}
    </div>
  </>);
};
