//ES5 
export default (function(){
	var _$table = null;
    var _map = {};
    /********** HELPER FUNCTIONS **********/
    const throwError = function(msg){
        throw Error('TABLER : ' + msg);
    }
    const isTableCreated = function(){
        return _$table != null;
    }
    const tableIsCreated = function(){
        if(!isTableCreated()){
            throwError('table is not created.');
        }
    }

    const jqIsLoaded = function(){
        if(!$){
            throwError('jQuery is not Loaded!');
        };
    }

    const nullToEmpty = function(obj){
        return obj || '';
    }
    const addColIndexClass = function($obj, idx){
        $obj.addClass('c'+idx);
    }
    const addRowIndexClass = function($obj, idx){
        $obj.addClass('r'+idx);
    }
    const setClass = function($obj, className){
        if($obj instanceof jQuery && className && typeof className === 'string'){
            $obj.attr('class',className);
        }
    }

    const setId = function($obj, id){
        if($obj instanceof jQuery && id && typeof id === 'string'){
            $obj.attr('id', id);
        }
    }

    const setHtml = function($obj, html){
        if($obj instanceof jQuery && html){
            $obj.html(html);
        }
    }

    const getRow = function(rowIdx){
        return _$table.find('tbody>.r'+rowIdx);
    }
    /********** MAIN FUNCTIONS**********/
    const createTable = function(){
        jqIsLoaded();
        _$table = $('<table/>').attr('id','tabler-table');
    }

    const createRows = function($parent, rows, isHeader){
        var rowIdx = 0;
        Object.keys(rows).forEach(function(rowId){
            var $tr =  $('<tr/>');
            setClass($tr,rows[rowId].class);
            addRowIndexClass($tr,rowIdx++);
            setId($tr, rows[rowId].id);
            _map[rowId] = rowIdx;
            createColumns($tr, rows[rowId].columns, isHeader);
            $parent.append($tr);
        });
    }

    const createColumns = function($tr, columns, isHeader){
        var tagName = isHeader ? 'th' : 'td';
        var colIdx = 0;
        //
        Object.keys(columns).forEach(function(columnId){
            var $td = $('<'+tagName+'/>');
            setClass($td, columns[columnId].class);
            addColIndexClass($td,colIdx++);
            setId($td, columns[columnId].id);
            setHtml($td, columns[columnId].data);
            $tr.append($td);
        });
    }
    /**********
    data : {
        colIndex : colData
    }
    **********/
    const updateRow = function(rowIdx, data){
        var $row = getRow(rowIdx);
        //
        if($row.length>0){
            for(var colIdx in data){
                var $td = $row.find('td.c'+colIdx);
                setHtml($td, data[colIdx]);
            }
            return $row;
        }
        return null;
    }

    const createHeader = function(headerRows){
        if(!headerRows){
            return;
        }
        //
        tableIsCreated();
        //
        var $thead = $('<thead/>'); 
        createRows($thead, headerRows, true);
        _$table.append($thead);
    }

    const createBody = function(bodyRows){
        if(!bodyRows){
            return;
        }
        //
        tableIsCreated();
        //
        var $tbody = $('<tbody/>');
        createRows($tbody, bodyRows, false);
        _$table.append($tbody);
    }

    const createFooter = function(footerRows){
        if(!headerRows){
            return;
        }
        tableIsCreated();
        //
        var $tfooter = $('<tfooter/>');
        createRows($tfooter, footerRows, false);
        _$table.append($tfooter);
    }
    /********** PUBLIC FUNCTIONS **********/
    var _pub = {};

    _pub.insert = function(bodyRows, headerRows, footerRows){
        //
        createHeader(headerRows);
        createBody(bodyRows);
        return this;
    }

    _pub.setTarget = function($table){
        //
        _$table = $table;
        return this;
    }

    _pub.set = function(settings){
        if(!settings){
            return;
        }
        if(!isTableCreated()){
            createTable();
        }
        setClass(_$table, settings.class);
        setId(_$table, settings.id);
    }

    _pub.create = function(bodyRows, headerRows, footerRows){
        //
        if(!isTableCreated()){
            createTable();
        }
        createHeader(headerRows);
        createBody(bodyRows);
        return this;
    }

    _pub.appendOn = function(selector){
        tableIsCreated();
        $(selector).append(_$table);
        return this;
    }

    _pub.prependOn = function(selector){
        tableIsCreated();
        $(selector).prepend(_$table);
        return this;
    }
    _pub.findRowIdx = function(Id){
        return _map[Id];
    }
    _pub.updateRow = function(rowIdx,data){
        if(typeof rowIdx === 'string'){
            rowIdx = parseInt(rowIdx);
        }
        if(!isNaN(rowIdx) && data && typeof data === 'object'){
            return updateRow(rowIdx,data);
        }
        return null;
    }
    _pub.clear = function(){
        _$table.find('tbody').empty();
        return this;
    }
    _pub.removeRow = function(rowIdx){
        var $row = getRow(rowIdx).remove();
        return this;
    }

    return _pub;
})();