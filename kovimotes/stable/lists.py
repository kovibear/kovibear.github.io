import os, re, json, time

def version():
  return time.strftime('%Y.%m.%d.%H%M')

def update_version(list, version):
  lists = {}
  with open('lists.json', 'r') as f:
    lists = json.load(f)
  if lists[list]:
    lists[list] = version
  with open('lists.json', 'w') as f:
    json.dump(lists, f, separators = (',', ':'))

def update_versions():
  print('Updating list.json versions..')
  lists = {}
  with open('lists.json', 'r') as f:
    lists = json.load(f)
  for list in lists:
    with open(list + '.json', 'r') as f:
      lists[list] = json.load(f)['version']
  with open('lists.json', 'w') as f:
    json.dump(lists, f, separators = (',', ':'))

class kovimotes:
  def add(self,*args):
    kovimotes = {}
    changes = False
    with open('kovimotes.json', 'r') as f: 
      kovimotes = json.load(f)
    for emote, extension in args:
      if not kovimotes['emotes']:
        kovimotes['emotes'] = []
      if not word in kovimotes['emotes']:
        kovimotes['emotes'].append(word)
        kovimotes['emotes'].sort()
        changes = True
    if changes:
      kovimotes['version'] = version()
      with open('kovimotes.json', 'w') as f:
        json.dump(kovimotes, f, separators = (',', ':'))
      update_version('kovimotes', kovimotes['version'])
  def rem(self,*args):
    kovimotes = {}
    changes = False
    with open('kovimotes.json', 'r') as f:
      kovimotes = json.load(f)
    for word in args:
      if not kovimotes['emotes']: return
      if word in kovimotes['emotes']:
        del kovimotes['emotes'][kovimotes['emotes'].index(word)]
        changes = True
    if changes:
      kovimotes['version'] = version()
      with open('kovimotes.json', 'w') as f:
        json.dump(kovimotes, f, separators = (',', ':'))
      update_version('kovimotes', kovimotes['version'])

class blacklist:
  def add(self,*args):
    blacklist = {}
    changes = False
    with open('blacklist.json', 'r') as f: 
      blacklist = json.load(f)
    for word in args:
      if not blacklist['emotes']:
        blacklist['emotes'] = []
      if not word in blacklist['emotes']:
        blacklist['emotes'].append(word)
        blacklist['emotes'].sort()
        changes = True
    if changes:
      blacklist['version'] = version()
      with open('blacklist.json', 'w') as f:
        json.dump(blacklist, f, separators = (',', ':'))
      update_version('blacklist', blacklist['version'])
  def rem(self,*args):
    blacklist = {}
    changes = False
    with open('blacklist.json', 'r') as f:
      blacklist = json.load(f)
    for word in args:
      if not blacklist['emotes']: return
      if word in blacklist['emotes']:
        del blacklist['emotes'][blacklist['emotes'].index(word)]
        changes = True
    if changes:
      blacklist['version'] = version()
      with open('blacklist.json', 'w') as f:
        json.dump(blacklist, f, separators = (',', ':'))
      update_version('blacklist', blacklist['version'])

# def uv(list, version):
  # lists = {}
  # with open('lists.json', 'r') as f:
    # lists = json.load(f)
  # if not lists[list]: return
  # lists[list] = version
  # with open('lists.json', 'w') as f:
    # json.dump(lists, f, separators = (',', ':'))
  
# def bl(*args):
  # blacklist = {}
  # changes = False
  # with open('blacklist.json', 'r') as f:
    # blacklist = json.load(f)
  # for word in args:
    # if not blacklist['emotes']: return
    # if word in blacklist['emotes']: continue
    # blacklist['emotes'].append(word)
    # blacklist['emotes'] = sorted(blacklist['emotes'])
    # changes = True
  # if not changes: return
  # version = time.strftime('%Y.%m.%d.%H%M')
  # blacklist['version'] = version
  # with open('blacklist.json', 'w') as f:
    # json.dump(blacklist, f, separators = (',', ':'))
  # uv('blacklist', version)
  
# def wl(*args):
  # blacklist = {}
  # changes = False
  # with open('blastlist.json', 'r') as f:
    # blacklist = json.load(f)
  # for word in args:
    # if not blacklist['emotes']: return
    # if not word in blacklist['emotes']: continue
    # i = blacklist['emotes'].index(word)
    # del blacklist['emotes'][i]
    # changes = True
  # if not changes: return
  # version = time.strftime('%Y.%m.%d.%H%M')
  # blacklist['version'] = version
  # with open('blacklist.json', 'w') as f:
    # json.dump(blacklist, f, separators = (',', ':'))
  # uv('blacklist', version)
    